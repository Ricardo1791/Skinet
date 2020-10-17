using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly SymmetricSecurityKey _key;
        public TokenService(IConfiguration config)
        {
            this._config = config;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Token:Key"]));
        }

        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.GivenName, user.DisplayName)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds,
                Issuer = _config["Token:Issuer"]
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public async Task<Address> GetAddressByUserEmail(string email) 
        {
            string _connectionString = _config.GetConnectionString("IdentityConnection");

            string queryString = $"select a.* from AspNetUsers u join Address a on a.AppUserId = u.Id where u.Email = '{email}'";

            using (SqlConnection sql = new SqlConnection(_connectionString))
            {
                SqlCommand cmd = new SqlCommand(queryString,sql);
                await sql.OpenAsync();

                SqlDataReader reader = await cmd.ExecuteReaderAsync();

                try
                {
                    if(reader.HasRows)
                    {
                        DataTable dt = new DataTable();
                        var model = new Address();

                        foreach(DataRow dr in dt.Rows)
                        {
                            model.Id = (int)dr["Id"];
                            model.FirstName = dr["FirstName"].ToString();
                            model.LastName = dr["LastName"].ToString();
                            model.Street = dr["Street"].ToString();
                            model.City = dr["City"].ToString();
                            model.State = dr["State"].ToString();
                            model.Zipcode = dr["ZipCode"].ToString();
                        }
                        return model;
                    }else{
                        return new Address();
                    }
                }
                catch (System.Exception e)
                {
                    var mensaje = e.InnerException;
                    return new Address();
                }
            }
        }
    }
}
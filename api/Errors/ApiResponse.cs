using System;

namespace api.Errors
{
    public class ApiResponse
    {
        public ApiResponse(int statuscode, string message = null)
        {
            StatusCode  = statuscode;
            Message = message ?? GetDefaultMessageForStatusCode(StatusCode);
        }
        public int StatusCode { get; set; }
        public string Message  { get; set; }

        
        private string GetDefaultMessageForStatusCode(int statusCode)
        {
            return statusCode switch
            {
                400 => "Bad Request",
                401 => "Unauthorized",
                404 => "Resource not found",
                500 => "Error",
                _ => null
            };
        }

    }
}
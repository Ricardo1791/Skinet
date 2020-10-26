using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderByPaymentIntentIdSpecification: BaseSpecifications<Order>
    {
        public OrderByPaymentIntentIdSpecification(string paymentId): base(o => o.PaymentIntentId == paymentId)
        {
            
        }
    }
}
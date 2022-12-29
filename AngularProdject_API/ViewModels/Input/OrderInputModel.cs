using Microsoft.EntityFrameworkCore.Metadata.Internal;
using AngularProdject_API.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AngularProdject_API.ViewModels.Input
{
    public class OrderInputModel
    {
        [Required]
        public int OrderID { get; set; }
        [Required, DataType(DataType.Date)]
        public DateTime OrderDate { get; set; }
        [DataType(DataType.Date)]
        public DateTime? DeliveryDate { get; set; }
        [Required, EnumDataType(typeof(Status))]
        public Status Status { get; set; }
        [Required]
        public int CustomerID { get; set; }
        public List<OrderItem> OrderItems { get; } = default!;
    }
}

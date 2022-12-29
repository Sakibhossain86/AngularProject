using Microsoft.EntityFrameworkCore.Metadata.Internal;
using AngularProdject_API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace AngularProdject_API.ViewModels
{
    public class OrderViewModel
    {
        public int OrderID { get; set; }
        
        public DateTime OrderDate { get; set; }
        
        public DateTime? DeliveryDate { get; set; }
        
        public Status Status { get; set; }
        
        public int CustomerID { get; set; }
        public string CustomerName { get; set; } = default!;
        public decimal OrderValue { get; set; }
    }
}

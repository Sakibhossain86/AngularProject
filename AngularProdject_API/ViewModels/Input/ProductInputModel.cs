using Microsoft.EntityFrameworkCore.Metadata.Internal;
using AngularProdject_API.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace AngularProdject_API.ViewModels.Input
{
    public class ProductInputModel
    {
        public int ProductID { get; set; }
        [Required, StringLength(50), Display(Name = "Product Name")]
        public string ProductName { get; set; } = default!;
        [Required, Column(TypeName = "money"), DisplayFormat(DataFormatString = "{0:0.00}")]
        public decimal Price { get; set; }
        public bool IsAvailable { get; set; }
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}

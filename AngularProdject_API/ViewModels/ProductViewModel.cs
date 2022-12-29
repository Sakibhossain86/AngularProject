using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace AngularProdject_API.ViewModels
{
    public class ProductViewModel
    {
        public int ProductID { get; set; }
        [Required, StringLength(50), Display(Name = "Product Name")]
        public string ProductName { get; set; } = default!;
        [Required, Column(TypeName = "money"), DisplayFormat(DataFormatString = "{0:0.00}")]
        public decimal Price { get; set; }
        [Required, StringLength(150)]
        public string Picture { get; set; } = default!;
        public bool IsAvailable { get; set; }

        public bool CanDelete { get; set; }
    }
}

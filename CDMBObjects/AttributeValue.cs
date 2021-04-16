using System.ComponentModel.DataAnnotations;

namespace CDMBObjects
{
    public class AttributeValue
    {
        [Key]
        public int ID { get; set; }

        public string Value { get; set; }

        public Attribute Attribute { get; set; }

        public Equipment Equipment { get; set; }
    }
}

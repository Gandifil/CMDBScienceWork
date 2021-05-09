using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CDMB.Common.Database
{
    public class Equipment
    {
        [Key]
        public int Id { get; set; }

        public string HostName { get; set; }

        public string SerialNumber { get; set; }

        public List<AttributeValue> Attributes { get; set; } = new List<AttributeValue>();

        //public List<ParameterLink> Parameters { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CDMBObjects
{
    public class ParameterType
    {
        public enum ValueType { String, Procent, Number}
        [Key]
        public int ID { get; set; }
        public ValueType Type { get; set; }
        public string InternalName { get; set; }
        public string VisibleName { get; set; }
        public int Order { get; set; }
    }
}

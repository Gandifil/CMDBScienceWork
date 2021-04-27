using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace CDMBObjects
{
    public class ParameterLink
    {
        [Key]
        public int ID { get; set; }

        public Metric Type { get; set; }
    }
}

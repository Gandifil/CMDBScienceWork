using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CDMBObjects
{
    public class Equipment
    {
        [Key]
        public int Id { get; set; }

        public string Name { get; set; }

        public int Cost { get; set; }

        public List<ParameterLink> Parameters { get; set; }
    }
}

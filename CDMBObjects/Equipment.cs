using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CDMBObjects
{
    public class Equipment
    {
        [Key]
        public int Id { get; set; }

        public string Hostname { get; set; }

        public string SerialNumber { get; set; }

        //public List<ParameterLink> Parameters { get; set; }
    }
}

using System;
using System.ComponentModel.DataAnnotations;

namespace CDMB.Common.Database
{
    public class Parameter
    {
        [Key]
        public int ID { get; set; }

        public string Value { get; set; }

        public string Log { get; set; }

        public bool Succes { get; set; }

        public DateTime UpdateTime { get; set; }

        public Metric Metric { get; set; }

        public Equipment Equipment { get; set; }
    }
}

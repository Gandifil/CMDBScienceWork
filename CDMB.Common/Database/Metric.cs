﻿using System.ComponentModel.DataAnnotations;

namespace CDMB.Common.Database
{
    public class Metric
    {
        [Key]
        public int ID { get; set; }
        public Attribute.ValueType Type { get; set; }
        public string Name { get; set; }
        public string Plugin { get; set; }
        public string Cron { get; set; }
        public uint HistoryDays { get; set; }
    }
}

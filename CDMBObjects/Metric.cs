using System.ComponentModel.DataAnnotations;

namespace CDMBObjects
{
    public class Metric
    {
        [Key]
        public int ID { get; set; }
        public Attribute.ValueType Type { get; set; }
        public string Name { get; set; }
        public string Plugin { get; set; }
        public uint Frequency { get; set; }
        public uint HistoryDays { get; set; }
    }
}

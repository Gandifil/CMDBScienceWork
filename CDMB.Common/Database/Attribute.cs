using System.ComponentModel.DataAnnotations;

namespace CDMB.Common.Database
{
    /// <summary>
    /// Описывает именованное значение (какого-либо типа), которое можно привязать к оборудованию.
    /// </summary>
    public class Attribute
    {
        /// <summary>
        /// Поддерживаемые типы аттрибута
        /// </summary>
        public enum ValueType
        {
            String,
            Percent,
            Float,
            Integer
        }
        [Key]
        public int ID { get; set; }

        /// <summary>
        /// Имя
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Тип
        /// </summary>
        public ValueType Type { get; set; }
    }
}

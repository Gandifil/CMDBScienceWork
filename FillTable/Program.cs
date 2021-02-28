using CDMBObjects;
using System;
using System.Linq;

namespace FillTable
{
    class Program
    {
        static void Main(string[] args)
        {
            using (ApplicationContext db = new ApplicationContext())
            {
                // создаем два объекта User
                var item1 = new Equipment { Name = "Tom", Cost = 33 };
                var item2 = new Equipment { Name = "Alice", Cost = 26 };

                // добавляем их в бд
                db.Equipments.Add(item1);
                db.Equipments.Add(item2);
                db.SaveChanges();
                Console.WriteLine("Объекты успешно сохранены");

                // получаем объекты из бд и выводим на консоль
                var equipments = db.Equipments.ToList();
                Console.WriteLine("Список объектов:");
                foreach (var item in equipments)
                {
                    Console.WriteLine($"{item.Id}.{item.Name} - {item.Cost}");
                }
            }
            Console.Read();
        }
    }
}

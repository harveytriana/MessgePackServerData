#define ANNOTATIONS

using MessagePack;
using System;

// Rename or remove the conditional compilation constant to use without annotations

namespace MessgePackServerData.Models
{

#if (ANNOTATIONS)
    [MessagePackObject(keyAsPropertyName: true)]
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }
    }
#else
    public class Book
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public DateTime Date { get; set; }
        public double Price { get; set; }
    }
#endif
}

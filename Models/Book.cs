#define ANNOTATIONS

using MessagePack;
using System;

// Rename or remove the conditional compilation constant to use without annotations

namespace MessgePackServerData.Models
{

#if (ANNOTATIONS)
    [MessagePackObject]
    public class Book
    {
        [Key(0)] public int Id { get; set; }
        [Key(1)] public string Title { get; set; }
        [Key(2)] public string Author { get; set; }
        [Key(3)] public DateTime Date { get; set; }
        [Key(4)] public double Price { get; set; }
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

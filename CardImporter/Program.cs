using System;
using System.Collections.Generic;
using System.IO;
using MagicDeckbuilder.Data;
using MagicDeckbuilder.Models.Magic;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace CardImporter
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = new DbContextOptionsBuilder<ApplicationDbContext>();
            builder.UseSqlServer(
                "Server=(localdb)\\mssqllocaldb;Database=MagicDeckbuilder;Trusted_Connection=True;MultipleActiveResultSets=true");
            var context = new ApplicationDbContext(builder.Options);

            Console.WriteLine("Reading card json...");
            var data = JsonConvert.DeserializeObject<List<Set>>(File.ReadAllText("AllSetsArray-x.json"));
            context.Sets.AddRange(data);
            context.SaveChanges();
        }
    }
}
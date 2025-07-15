using Microsoft.EntityFrameworkCore;
using Repository.Data;
using Repository.Interfaces;
using Repository.Repositories;
using Repository.UnitOfWork;
using Service.IServices;
using Service.Mapping;
using Service.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<CookiePolicyOptions>(options =>
{
    // This lambda determines whether user consent for non-essential cookies is needed for a given request.
    options.CheckConsentNeeded = context => true;
    options.MinimumSameSitePolicy = SameSiteMode.None;
});
// Add services to the container.
builder.Services.AddRazorPages().AddRazorRuntimeCompilation();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductListRepository, ProductListRepository>();
builder.Services.AddScoped<IProductListService, ProductListService>();

builder.Services.AddControllersWithViews();
builder.Services.AddControllers(); // Ajout pour les API

builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}
else
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("AllowAll");

// Map controllers (API)
app.MapControllers();

// Fallback for SPA
app.MapFallbackToFile("index.html");

app.Run();

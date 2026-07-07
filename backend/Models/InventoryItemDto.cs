using System.ComponentModel.DataAnnotations;

namespace InventoryApi.Models;

public class InventoryItemDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; init; } = string.Empty;

    [StringLength(300)]
    public string? Description { get; init; }

    [Range(0, int.MaxValue)]
    public int Quantity { get; init; }

    [StringLength(500)]
    public string? Notes { get; init; }
}

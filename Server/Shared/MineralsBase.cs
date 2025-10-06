namespace Server.Shared;

public class MineralsBase
{
  public double Calcium { get; set; }
  public double Copper { get; set; }
  public double Fluoride { get; set; }
  public double Iron { get; set; }
  public double Magnesium { get; set; }
  public double Manganese { get; set; }
  public double Phosphorus { get; set; }
  public double Potassium { get; set; }
  public double Selenium { get; set; }
  public double Sodium { get; set; }
  public double Zinc { get; set; }

  public MineralsBase() { }

  public MineralsBase(MineralsBase minerals, double quantity)
  {
    Calcium = minerals.Calcium * quantity / 100;
    Copper = minerals.Copper * quantity / 100;
    Fluoride = minerals.Fluoride * quantity / 100;
    Iron = minerals.Iron * quantity / 100;
    Magnesium = minerals.Magnesium * quantity / 100;
    Manganese = minerals.Manganese * quantity / 100;
    Phosphorus = minerals.Phosphorus * quantity / 100;
    Potassium = minerals.Potassium * quantity / 100;
    Sodium = minerals.Sodium * quantity / 100;
    Zinc = minerals.Zinc * quantity / 100;
    Selenium = minerals.Selenium * quantity / 100;
  }

  public MineralsBase Add(MineralsBase minerals)
  {
    Calcium += minerals.Calcium;
    Copper += minerals.Copper;
    Fluoride += minerals.Fluoride;
    Iron += minerals.Iron;
    Magnesium += minerals.Magnesium;
    Manganese += minerals.Manganese;
    Phosphorus += minerals.Phosphorus;
    Potassium += minerals.Potassium;
    Sodium += minerals.Sodium;
    Zinc += minerals.Zinc;
    Selenium += minerals.Selenium;

    return this;
  }
}
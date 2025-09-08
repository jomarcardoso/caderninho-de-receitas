namespace Server.Shared;

public class Vitamins
{
  public double A { get; set; }
  public double AlphaCarotene { get; set; }
  public double B1 { get; set; }
  public double B11 { get; set; }
  public double B12 { get; set; }
  public double B2 { get; set; }
  public double B3 { get; set; }
  public double B5 { get; set; }
  public double B6 { get; set; }
  public double B7 { get; set; }
  public double B9 { get; set; }
  public double BetaCarotene { get; set; }
  public double C { get; set; }
  public double Choline { get; set; }
  public double CryptoxanthinCarotene { get; set; }
  public double D { get; set; }
  public double D2 { get; set; }
  public double D3 { get; set; }
  public double E { get; set; }
  public double K { get; set; }
  public double Lycopene { get; set; }

  public Vitamins() { }

  public Vitamins(Vitamins vitamins, double quantity)
  {
    A = vitamins.A * quantity / 100;
    AlphaCarotene = vitamins.AlphaCarotene * quantity / 100;
    B1 = vitamins.B1 * quantity / 100;
    B11 = vitamins.B11 * quantity / 100;
    B12 = vitamins.B12 * quantity / 100;
    B2 = vitamins.B2 * quantity / 100;
    B3 = vitamins.B3 * quantity / 100;
    B5 = vitamins.B5 * quantity / 100;
    B6 = vitamins.B6 * quantity / 100;
    B7 = vitamins.B7 * quantity / 100;
    B9 = vitamins.B9 * quantity / 100;
    BetaCarotene = vitamins.BetaCarotene * quantity / 100;
    C = vitamins.C * quantity / 100;
    Choline = vitamins.Choline * quantity / 100;
    CryptoxanthinCarotene = vitamins.CryptoxanthinCarotene * quantity / 100;
    D = vitamins.D * quantity / 100;
    D2 = vitamins.D2 * quantity / 100;
    D3 = vitamins.D3 * quantity / 100;
    E = vitamins.E * quantity / 100;
    K = vitamins.K * quantity / 100;
    Lycopene = vitamins.Lycopene * quantity / 100;
  }

  public Vitamins Add(Vitamins vitamins)
  {
    A += vitamins.A;
    AlphaCarotene += vitamins.AlphaCarotene;
    B1 += vitamins.B1;
    B11 += vitamins.B11;
    B12 += vitamins.B12;
    B2 += vitamins.B2;
    B3 += vitamins.B3;
    B5 += vitamins.B5;
    B6 += vitamins.B6;
    B7 += vitamins.B7;
    B9 += vitamins.B9;
    BetaCarotene += vitamins.BetaCarotene;
    C += vitamins.C;
    Choline += vitamins.Choline;
    CryptoxanthinCarotene += vitamins.CryptoxanthinCarotene;
    D += vitamins.D;
    D2 += vitamins.D2;
    D3 += vitamins.D3;
    E += vitamins.E;
    K += vitamins.K;
    Lycopene += vitamins.Lycopene;

    return this;
  }
}

using System.IO;
using System;

public class Veiculo
{
public virtual void mover()
{
Console.Write("Movendo");
}
}
public class Automovel:Veiculo
{
public override void mover()
{
Console.Write("Acelerando");
}
}
public class Fusca:Automovel
{
public override void mover()
{
Console.Write ("Passeando");
}
}
class Program
{
static void Main()
{
Veiculo veiculo = new Fusca();
veiculo.mover();
}
}
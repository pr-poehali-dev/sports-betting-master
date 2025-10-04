import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

export const KellyCalculator = () => {
  const [bankroll, setBankroll] = useState<number>(10000);
  const [odds, setOdds] = useState<number>(2.0);
  const [probability, setProbability] = useState<number>(55);
  const [kellyFraction, setKellyFraction] = useState<number>(50);

  const calculateKelly = () => {
    const p = probability / 100;
    const q = 1 - p;
    const b = odds - 1;
    
    const kelly = (b * p - q) / b;
    
    return Math.max(0, kelly);
  };

  const fullKelly = calculateKelly();
  const fractionalKelly = fullKelly * (kellyFraction / 100);
  const stakeAmount = bankroll * fractionalKelly;
  
  const impliedProbability = (1 / odds) * 100;
  const hasValue = probability > impliedProbability;
  const valuePercent = ((probability / impliedProbability) - 1) * 100;
  
  const expectedValue = (probability / 100) * (odds - 1) * stakeAmount - ((100 - probability) / 100) * stakeAmount;
  const roi = (expectedValue / stakeAmount) * 100;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Calculator" className="text-primary" />
            Калькулятор Келли
          </CardTitle>
          <CardDescription>
            Рассчитай оптимальный размер ставки на основе твоей оценки вероятности
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="bankroll" className="flex items-center gap-2 mb-2">
                  <Icon name="Wallet" size={16} />
                  Размер банкролла (₽)
                </Label>
                <Input
                  id="bankroll"
                  type="number"
                  value={bankroll}
                  onChange={(e) => setBankroll(Number(e.target.value))}
                  min={0}
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="odds" className="flex items-center gap-2 mb-2">
                  <Icon name="TrendingUp" size={16} />
                  Коэффициент
                </Label>
                <Input
                  id="odds"
                  type="number"
                  step="0.01"
                  value={odds}
                  onChange={(e) => setOdds(Number(e.target.value))}
                  min={1.01}
                  className="text-lg"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Подразумеваемая вероятность: {impliedProbability.toFixed(1)}%
                </p>
              </div>

              <div>
                <Label htmlFor="probability" className="flex items-center gap-2 mb-2">
                  <Icon name="Target" size={16} />
                  Твоя оценка вероятности: {probability}%
                </Label>
                <Slider
                  id="probability"
                  value={[probability]}
                  onValueChange={(val) => setProbability(val[0])}
                  min={0}
                  max={100}
                  step={1}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="fraction" className="flex items-center gap-2 mb-2">
                  <Icon name="Shield" size={16} />
                  Дробный Келли: {kellyFraction}%
                </Label>
                <Slider
                  id="fraction"
                  value={[kellyFraction]}
                  onValueChange={(val) => setKellyFraction(val[0])}
                  min={10}
                  max={100}
                  step={10}
                  className="mt-2"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Рекомендуется: 25-50% для снижения дисперсии
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 border-2">
                <div className="text-sm text-muted-foreground mb-1">Рекомендуемая ставка</div>
                <div className="text-3xl font-bold text-primary">
                  {stakeAmount.toFixed(0)} ₽
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {((stakeAmount / bankroll) * 100).toFixed(2)}% от банкролла
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-muted/30 rounded-lg p-3 border">
                  <div className="text-xs text-muted-foreground mb-1">Полный Келли</div>
                  <div className="text-lg font-bold">
                    {(fullKelly * 100).toFixed(1)}%
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 border">
                  <div className="text-xs text-muted-foreground mb-1">Ожидаемая прибыль</div>
                  <div className="text-lg font-bold">
                    {expectedValue.toFixed(0)} ₽
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 border">
                  <div className="text-xs text-muted-foreground mb-1">ROI</div>
                  <div className={`text-lg font-bold ${roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {roi > 0 ? '+' : ''}{roi.toFixed(1)}%
                  </div>
                </div>
                <div className="bg-muted/30 rounded-lg p-3 border">
                  <div className="text-xs text-muted-foreground mb-1">Value</div>
                  <div className={`text-lg font-bold ${hasValue ? 'text-green-600' : 'text-red-600'}`}>
                    {hasValue ? '+' : ''}{valuePercent.toFixed(1)}%
                  </div>
                </div>
              </div>

              {!hasValue && (
                <Alert className="border-red-600/50 bg-red-50">
                  <Icon name="AlertTriangle" className="text-red-600" />
                  <AlertDescription className="ml-2">
                    <strong>Нет value!</strong> Твоя оценка вероятности ({probability}%) ниже подразумеваемой ({impliedProbability.toFixed(1)}%). Такую ставку делать не рекомендуется.
                  </AlertDescription>
                </Alert>
              )}

              {hasValue && valuePercent < 5 && (
                <Alert className="border-yellow-600/50 bg-yellow-50">
                  <Icon name="Info" className="text-yellow-600" />
                  <AlertDescription className="ml-2">
                    <strong>Малый value</strong> ({valuePercent.toFixed(1)}%). Возможно, стоит поискать более выгодные варианты.
                  </AlertDescription>
                </Alert>
              )}

              {hasValue && valuePercent >= 5 && (
                <Alert className="border-green-600/50 bg-green-50">
                  <Icon name="CheckCircle" className="text-green-600" />
                  <AlertDescription className="ml-2">
                    <strong>Хороший value!</strong> Твоя оценка превышает подразумеваемую вероятность на {valuePercent.toFixed(1)}%.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </div>

          <Separator />

          <div className="bg-muted/30 rounded-lg p-4 space-y-3">
            <h4 className="font-semibold flex items-center gap-2">
              <Icon name="Lightbulb" className="text-primary" size={18} />
              Как использовать калькулятор
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Укажи свой банкролл и коэффициент букмекера</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>На основе анализа оцени реальную вероятность события</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>Выбери дробь Келли (новичкам рекомендуется 25-50%)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">4.</span>
                <span>Если есть value и ROI положительный — можно рассмотреть ставку</span>
              </li>
            </ul>
          </div>

          <Alert>
            <Icon name="AlertCircle" className="text-primary" />
            <AlertDescription className="ml-2 text-sm">
              <strong>Важно:</strong> Критерий Келли — это математическая модель. Она не учитывает все факторы (травмы, погоду, мотивацию). Всегда дополняй расчёты качественным анализом!
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  );
};

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Exercise {
  id: number;
  question: string;
  scenario: string;
  options: { value: string; label: string }[];
  correctAnswer: string;
  explanation: string;
}

const exercises: Exercise[] = [
  {
    id: 1,
    question: 'Какое решение наиболее рациональное?',
    scenario: 'Команда А играет дома против команды Б. Твоя любимая команда А идет на 5-матчевой проигрышной серии. Коэффициент на победу А — 2.80, на Б — 2.40. Статистика показывает: А выигрывает дома в 40% случаев против топ-команд.',
    options: [
      { value: 'a', label: 'Поставить на команду А, потому что она моя любимая и "должна" выиграть' },
      { value: 'b', label: 'Поставить на команду Б — у них меньший коэффициент, значит выше вероятность' },
      { value: 'c', label: 'Рассчитать подразумеваемую вероятность и сравнить со статистикой' },
      { value: 'd', label: 'Не делать ставку вообще — слишком непредсказуемый матч' },
    ],
    correctAnswer: 'c',
    explanation: 'Правильный подход — математический расчет. Коэф. 2.80 = ~35.7% вероятность, коэф. 2.40 = ~41.7%. Статистика дает 40% для А дома. Нет явного value, можно пропустить ставку или искать другие рынки.',
  },
  {
    id: 2,
    question: 'Как правильно управлять банкроллом?',
    scenario: 'У тебя банкролл 10,000₽. Ты нашел отличную ставку с коэффициентом 2.0 и уверен на 60%. По критерию Келли оптимальная ставка — 20% банка (2000₽). Что делать?',
    options: [
      { value: 'a', label: 'Поставить 2000₽ — математика не врет' },
      { value: 'b', label: 'Поставить 10% или меньше для снижения дисперсии' },
      { value: 'c', label: 'Поставить все 10,000₽ — раз уверен на 60%' },
      { value: 'd', label: 'Не ставить — 2000₽ это слишком много' },
    ],
    correctAnswer: 'b',
    explanation: 'Критерий Келли в чистом виде агрессивен. Практики используют дробный Келли (1/4 или 1/2) для управления рисками. 10% банка (1000₽) — разумный компромисс между ростом и безопасностью.',
  },
  {
    id: 3,
    question: 'Оценка value в коэффициентах',
    scenario: 'Букмекер дает коэф. 1.90 на тотал больше 2.5 в матче. Твой анализ показывает, что вероятность ТБ 2.5 = 55%. Есть ли value?',
    options: [
      { value: 'a', label: 'Нет value — коэффициент слишком низкий' },
      { value: 'b', label: 'Да, есть value около 4.5%' },
      { value: 'c', label: 'Невозможно определить без дополнительных данных' },
      { value: 'd', label: 'Да, огромный value — нужно ставить максимум' },
    ],
    correctAnswer: 'b',
    explanation: 'Подразумеваемая вероятность коэф. 1.90 = 52.6%. Твоя оценка 55%. Value = (55% × 1.90) - 100% = 4.5%. Это хороший показатель для ставки, но не "огромный".',
  },
];

export const PracticeExercise = () => {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const exercise = exercises[currentExercise];

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    
    if (selectedAnswer === exercise.correctAnswer) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      setCurrentExercise(0);
      setSelectedAnswer('');
      setShowResult(false);
      setScore(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            {currentExercise + 1}
          </div>
          <span className="text-sm text-muted-foreground">из {exercises.length}</span>
        </div>
        <div className="text-sm font-medium">
          Счёт: {score}/{exercises.length}
        </div>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>{exercise.question}</CardTitle>
          <CardDescription className="text-base mt-2">
            {exercise.scenario}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} disabled={showResult}>
            {exercise.options.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 space-y-0">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label
                  htmlFor={option.value}
                  className={`flex-1 cursor-pointer ${
                    showResult
                      ? option.value === exercise.correctAnswer
                        ? 'text-green-600 font-medium'
                        : option.value === selectedAnswer
                        ? 'text-red-600'
                        : ''
                      : ''
                  }`}
                >
                  {option.label}
                  {showResult && option.value === exercise.correctAnswer && (
                    <Icon name="CheckCircle" className="inline ml-2 text-green-600" size={18} />
                  )}
                  {showResult && option.value === selectedAnswer && option.value !== exercise.correctAnswer && (
                    <Icon name="XCircle" className="inline ml-2 text-red-600" size={18} />
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {showResult && (
            <Alert className={selectedAnswer === exercise.correctAnswer ? 'border-green-600' : 'border-red-600'}>
              <Icon 
                name={selectedAnswer === exercise.correctAnswer ? 'CheckCircle' : 'XCircle'} 
                className={selectedAnswer === exercise.correctAnswer ? 'text-green-600' : 'text-red-600'} 
              />
              <AlertDescription className="ml-2">
                <strong className="block mb-1">
                  {selectedAnswer === exercise.correctAnswer ? '✅ Верно!' : '❌ Неправильно'}
                </strong>
                {exercise.explanation}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2">
            {!showResult ? (
              <Button 
                onClick={handleSubmit} 
                disabled={!selectedAnswer}
                className="w-full"
              >
                Проверить ответ
              </Button>
            ) : (
              <Button onClick={handleNext} className="w-full">
                {currentExercise < exercises.length - 1 ? 'Следующее упражнение' : 'Начать заново'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2">
        {exercises.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 rounded-full ${
              idx < currentExercise
                ? 'bg-primary'
                : idx === currentExercise
                ? 'bg-primary/50'
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

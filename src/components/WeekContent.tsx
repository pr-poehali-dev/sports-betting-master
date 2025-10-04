import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

interface Lesson {
  id: number;
  title: string;
  duration: string;
}

interface Week {
  week: number;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface WeekContentProps {
  week: Week;
  completedLessons: number[];
  toggleLesson: (lessonId: number) => void;
}

const weekDetails: Record<number, { overview: string; keyPoints: string[] }> = {
  1: {
    overview: 'На первой неделе ты освоишь фундаментальные принципы анализа спортивных событий. Научишься работать со статистикой, понимать коэффициенты и оценивать вероятности.',
    keyPoints: [
      'Как собирать и интерпретировать статистические данные',
      'Разница между маржой букмекера и реальной вероятностью',
      'Базовые математические концепции для ставок',
      'Анализ формы команд и ключевых показателей'
    ]
  },
  2: {
    overview: 'Вторая неделя посвящена психологии ставок. Ты узнаешь, как эмоции влияют на решения, и научишься их контролировать для принятия рациональных ставок.',
    keyPoints: [
      'Распознавание эмоциональных триггеров',
      'Когнитивные искажения: эффект якоря, подтверждения',
      'Техники самоконтроля и дисциплины',
      'Правильная реакция на серии проигрышей'
    ]
  },
  3: {
    overview: 'Третья неделя — это управление капиталом. Ты освоишь стратегии банкролл-менеджмента и научишься защищать свой капитал от необдуманных рисков.',
    keyPoints: [
      'Расчет оптимального размера ставки (критерий Келли)',
      'Фиксированные vs процентные ставки',
      'Value betting: как находить переоцененные события',
      'Диверсификация рисков в портфеле ставок'
    ]
  },
  4: {
    overview: 'Финальная неделя — практика и создание собственной системы прогнозов. Ты объединишь все знания и научишься создавать независимые прогнозы.',
    keyPoints: [
      'Построение собственной прогностической модели',
      'Специфика анализа футбола, тенниса, баскетбола',
      'Поиск ошибок в линиях букмекеров',
      'Создание системы отслеживания результатов'
    ]
  }
};

export const WeekContent = ({ week, completedLessons, toggleLesson }: WeekContentProps) => {
  const details = weekDetails[week.week];
  const completedCount = week.lessons.filter(l => completedLessons.includes(l.id)).length;
  const progressPercent = (completedCount / week.lessons.length) * 100;

  return (
    <div className="space-y-6">
      <Card className="border-2 border-primary/20">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">
                {week.title}
              </CardTitle>
              <CardDescription className="text-base">
                {week.description}
              </CardDescription>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">{completedCount}/{week.lessons.length}</div>
              <div className="text-sm text-muted-foreground">завершено</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4">{details.overview}</p>
          
          <Separator className="my-4" />
          
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Icon name="Lightbulb" className="text-primary" size={20} />
            Что ты изучишь:
          </h4>
          <ul className="space-y-2">
            {details.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Icon name="CheckCircle" className="text-secondary mt-0.5 flex-shrink-0" size={18} />
                <span className="text-sm">{point}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="BookOpen" className="text-primary" />
            Уроки недели
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {week.lessons.map((lesson) => {
              const isCompleted = completedLessons.includes(lesson.id);
              
              return (
                <div
                  key={lesson.id}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all ${
                    isCompleted 
                      ? 'border-primary/20 bg-primary/5' 
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <Checkbox
                    checked={isCompleted}
                    onCheckedChange={() => toggleLesson(lesson.id)}
                    className="flex-shrink-0"
                  />
                  <div className="flex-1">
                    <h4 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                      {lesson.title}
                    </h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                      <Icon name="Clock" size={14} />
                      {lesson.duration}
                    </p>
                  </div>
                  <Button 
                    variant={isCompleted ? "outline" : "default"}
                    size="sm"
                  >
                    {isCompleted ? (
                      <>
                        <Icon name="RotateCcw" size={16} className="mr-2" />
                        Повторить
                      </>
                    ) : (
                      <>
                        <Icon name="Play" size={16} className="mr-2" />
                        Начать
                      </>
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="tips">
          <AccordionTrigger className="text-lg font-semibold">
            <div className="flex items-center gap-2">
              <Icon name="Sparkles" className="text-primary" />
              Практические советы для недели {week.week}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Card>
              <CardContent className="pt-6">
                {week.week === 1 && (
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">💡</span>
                      <span>Начни с анализа одного вида спорта, который хорошо знаешь</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">📊</span>
                      <span>Создай таблицу для фиксации статистики последних 10 матчей команд</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">🎯</span>
                      <span>Практикуйся в расчете вероятностей по коэффициентам без реальных ставок</span>
                    </li>
                  </ul>
                )}
                {week.week === 2 && (
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">🧘</span>
                      <span>Заведи дневник эмоций: записывай, что чувствуешь перед каждым решением</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">⏸️</span>
                      <span>Правило 24 часов: не делай ставку сразу, подожди минимум сутки</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">🚫</span>
                      <span>Избегай ставок на любимую команду — это главный источник эмоций</span>
                    </li>
                  </ul>
                )}
                {week.week === 3 && (
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">💰</span>
                      <span>Выдели тренировочный банкролл и никогда не превышай 1-2% на ставку</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">📈</span>
                      <span>Веди учет всех ставок в Excel/Google Sheets для анализа ROI</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">🎲</span>
                      <span>Ставки делай только когда видишь value минимум 5-10%</span>
                    </li>
                  </ul>
                )}
                {week.week === 4 && (
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">🔬</span>
                      <span>Создай свою модель прогноза: весовые коэффициенты для каждого фактора</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">📝</span>
                      <span>Пиши обоснование каждого прогноза — это усилит аналитические навыки</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-primary font-bold">🔄</span>
                      <span>Анализируй результаты: что сработало, а что нет, и корректируй подход</span>
                    </li>
                  </ul>
                )}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

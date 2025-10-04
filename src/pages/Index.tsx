import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { WeekContent } from '@/components/WeekContent';
import { PracticeExercise } from '@/components/PracticeExercise';

const Index = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const weeks = [
    {
      week: 1,
      title: 'Основы анализа',
      description: 'Статистика, вероятности и базовые концепции',
      lessons: [
        { id: 1, title: 'Введение в спортивную аналитику', duration: '15 мин' },
        { id: 2, title: 'Как читать статистику команд', duration: '20 мин' },
        { id: 3, title: 'Основы теории вероятностей', duration: '25 мин' },
        { id: 4, title: 'Понимание коэффициентов и линий', duration: '20 мин' },
      ],
    },
    {
      week: 2,
      title: 'Психология ставок',
      description: 'Эмоции vs логика, дисциплина и контроль',
      lessons: [
        { id: 5, title: 'Эмоциональные vs вероятностные ставки', duration: '20 мин' },
        { id: 6, title: 'Ловушки когнитивных искажений', duration: '25 мин' },
        { id: 7, title: 'Дисциплина и самоконтроль', duration: '15 мин' },
        { id: 8, title: 'Работа с проигрышами', duration: '20 мин' },
      ],
    },
    {
      week: 3,
      title: 'Стратегии и банкролл',
      description: 'Управление капиталом и риск-менеджмент',
      lessons: [
        { id: 9, title: 'Основы банкролл-менеджмента', duration: '25 мин' },
        { id: 10, title: 'Размер ставок: фиксированный vs процентный', duration: '20 мин' },
        { id: 11, title: 'Стратегия value betting', duration: '30 мин' },
        { id: 12, title: 'Риск-менеджмент в действии', duration: '25 мин' },
      ],
    },
    {
      week: 4,
      title: 'Прогнозы и практика',
      description: 'Создание своих прогнозов и практические навыки',
      lessons: [
        { id: 13, title: 'Формирование собственного прогноза', duration: '30 мин' },
        { id: 14, title: 'Анализ разных видов спорта', duration: '35 мин' },
        { id: 15, title: 'Поиск value в линиях букмекеров', duration: '25 мин' },
        { id: 16, title: 'Итоговый практический тест', duration: '40 мин' },
      ],
    },
  ];

  const totalLessons = weeks.reduce((acc, week) => acc + week.lessons.length, 0);
  const progress = (completedLessons.length / totalLessons) * 100;

  const toggleLesson = (lessonId: number) => {
    setCompletedLessons(prev =>
      prev.includes(lessonId)
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <div 
        className="absolute inset-0 opacity-5 bg-cover bg-center"
        style={{ backgroundImage: 'url(/img/1c83cfb6-3de3-4bb1-8f37-f82950acbec4.jpg)' }}
      />
      
      <div className="relative">
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" className="text-primary-foreground" size={24} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Академия ставок</h1>
                  <p className="text-sm text-muted-foreground">Путь к осознанным прогнозам</p>
                </div>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Icon name="Trophy" size={16} className="mr-2" />
                {completedLessons.length}/{totalLessons} уроков
              </Badge>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Card className="mb-8 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Target" className="text-primary" />
                Твой прогресс обучения
              </CardTitle>
              <CardDescription>
                Пройдено {completedLessons.length} из {totalLessons} уроков
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progress} className="h-3" />
              <p className="text-sm text-muted-foreground mt-2">
                {progress.toFixed(0)}% завершено
              </p>
            </CardContent>
          </Card>

          <Tabs value={`week${currentWeek}`} onValueChange={(val) => setCurrentWeek(Number(val.replace('week', '')))}>
            <TabsList className="grid grid-cols-4 mb-8">
              {weeks.map((week) => (
                <TabsTrigger key={week.week} value={`week${week.week}`} className="relative">
                  <div className="flex items-center gap-2">
                    <span>Неделя {week.week}</span>
                    {week.lessons.every(l => completedLessons.includes(l.id)) && (
                      <Icon name="CheckCircle2" size={16} className="text-primary" />
                    )}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {weeks.map((week) => (
              <TabsContent key={week.week} value={`week${week.week}`}>
                <WeekContent
                  week={week}
                  completedLessons={completedLessons}
                  toggleLesson={toggleLesson}
                />
              </TabsContent>
            ))}
          </Tabs>

          <Card className="mt-8 border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Dumbbell" className="text-primary" />
                Практические упражнения
              </CardTitle>
              <CardDescription>
                Тренируй аналитическое мышление на реальных примерах
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PracticeExercise />
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="LineChart" className="text-primary" size={24} />
                </div>
                <CardTitle>Анализ статистики</CardTitle>
                <CardDescription>
                  Научись извлекать ценные инсайты из спортивных данных
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="Brain" className="text-secondary" size={24} />
                </div>
                <CardTitle>Контроль эмоций</CardTitle>
                <CardDescription>
                  Избегай импульсивных решений и держи фокус на логике
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon name="Wallet" className="text-accent" size={24} />
                </div>
                <CardTitle>Банкролл-менеджмент</CardTitle>
                <CardDescription>
                  Защити свой капитал с помощью грамотного управления
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </main>

        <footer className="border-t mt-16 py-8 bg-muted/30">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>🎯 Помни: успешные ставки — это марафон, а не спринт</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;

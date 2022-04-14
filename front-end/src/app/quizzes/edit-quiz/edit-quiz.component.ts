import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Quiz} from 'src/models/quiz.model';
import {QuizService} from 'src/services/quiz.service';
import {Question} from '../../../models/question.model';

@Component({
    selector: 'app-edit-quiz',
    templateUrl: './edit-quiz.component.html',
    styleUrls: ['./edit-quiz.component.scss']
})
export class EditQuizComponent implements OnInit {

    public quiz: Quiz;
    public selectedQuestion: Question;

    constructor(private router: Router,private route: ActivatedRoute, private quizService: QuizService) {
        this.quizService.quizSelected$.subscribe((quiz) => this.quiz = quiz);
    }

    ngOnInit(): void {
        const id = parseInt(this.route.snapshot.paramMap.get('id'));
        this.quizService.setSelectedQuiz(id);
    }

    updateQuestions($event: Question) {
        this.quizService.editQuestion($event);
    }

    selectQuestion($event: number) {
        this.selectedQuestion = this.quiz.questions.filter(e => e.id === $event)[0];
    }

    retour() {
        let theme = this.quiz.theme ?? "0";
        this.router.navigate(['/quiz-list/' + theme]);
    }
}

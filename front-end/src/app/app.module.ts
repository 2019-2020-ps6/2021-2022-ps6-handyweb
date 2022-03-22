import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {QuizListComponent} from './quizzes/quiz-list/quiz-list.component';
import {QuizComponent} from './quizzes/quiz/quiz.component';
import {HeaderComponent} from './header/header.component';
import {QuizFormComponent} from './quizzes/quiz-form/quiz-form.component';
import {EditQuizComponent} from './quizzes/edit-quiz/edit-quiz.component';
import {AppRoutingModule} from './app.routing.module';
import {QuestionListComponent} from './questions/question-list/question-list.component';
import {QuestionFormComponent} from './questions/question-form/question-form.component';
import {QuestionComponent} from './questions/question/question.component';
import {UserComponent} from './users/user/user.component';
import {UserFormComponent} from './users/user-form/user-form.component';
import {UserListComponent} from './users/user-list/user-list.component';
import {AccueilComponent} from './accueil/accueil.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {ThemeComponent} from './themes/theme/theme.component';
import {ThemeFormComponent} from './themes/theme-form/theme-form.component';
import {ThemeListComponent} from './themes/theme-list/theme-list.component';
import {
  ConfigurationAutomatiqueComponent
} from './accueil/configuration/configuration-automatique/configuration-automatique.component';
import {
  ConfigurationManuelleComponent
} from './accueil/configuration/configuration-manuelle/configuration-manuelle.component';
import {
  ConfigurationSelectionComponent
} from './accueil/configuration/configuration-selection/configuration-selection.component';
import {EditThemeComponent} from './themes/edit-theme/edit-theme.component';
import {PlayQuizComponent} from './quizzes/play-quiz/play-quiz.component';
import {ReponseComponent} from './quizzes/edit-quiz/reponse/reponse.component';

@NgModule({
    declarations: [
        AppComponent,
        QuizListComponent,
        QuizComponent,
        HeaderComponent,
        QuizFormComponent,
        EditQuizComponent,
        QuestionListComponent,
        QuestionFormComponent,
        QuestionComponent,
        UserComponent,
        UserFormComponent,
        UserListComponent,
        AccueilComponent,
        ThemeFormComponent,
        ConnexionComponent,
        ThemeFormComponent,
        ThemeListComponent,
        ThemeComponent,
        ConfigurationAutomatiqueComponent,
        ConfigurationManuelleComponent,
        ConfigurationSelectionComponent,
        EditThemeComponent,
        PlayQuizComponent,
        ReponseComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

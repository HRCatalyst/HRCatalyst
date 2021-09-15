import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as QuestionActions from './question.actions';
import { LoaderService, Question } from '@hrc/shared-feature';
import { Store } from '@ngrx/store';
import { Firestore } from '@angular/fire/firestore';
import { QuestionState } from './question.entity';


@Injectable()
export class QuestionEffects {

  constructor(private actions$: Actions,
    private store: Store<QuestionState>,
    private firestore: Firestore,
    private loader: LoaderService) {}

  load$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(QuestionActions.loadAllQuestions),
    mergeMap(() => {
      this.loader.isLoading.next(true);
      return this.get()
      .pipe(
        map(Questions => {
          this.loader.isLoading.next(false);
          return QuestionActions.loadAllQuestionsSuccess({payload: Questions});
        }),
        catchError((err, caught) => {
          this.store.dispatch(QuestionActions.loadAllQuestionsFailure({error: err}));
          this.loader.isLoading.next(false);
          return caught;
        })
    )})
  )});

  create$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(QuestionActions.createQuestion),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return QuestionActions.createQuestionSuccess({payload: data});
        })
        .catch((err: any) => {
            this.loader.isLoading.next(false);
            return QuestionActions.createQuestionFailire({error: err});
        });
      return of(x);
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(QuestionActions.updateQuestion),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return QuestionActions.updateQuestionSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return QuestionActions.updateQuestionFailure({error: err});
        });
      return of(x);
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(QuestionActions.deleteQuestion),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return QuestionActions.deleteQuestionSuccess({payload: x.payload.id});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return QuestionActions.deleteQuestionFailure({error: err});
          return of(x);
        });
      return of(x);
    })
  )});

  get() {
      return this.firestore.collection<Question>('questions').snapshotChanges();
  }

  create(question: Question) {
    delete question.id;
    const g = Object.assign({}, question);
    return this.firestore.collection<Question>('questions').add(g);
  }

  update(question: Question) {
    const g = Object.assign({}, question);
    return this.firestore.doc('questions/' + question.id).update(g);
  }

  delete(id: string) {
    return this.firestore.doc('questions/' + id).delete();
  }
}

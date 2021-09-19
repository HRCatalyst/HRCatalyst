import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as QuestionActions from './question.actions';
import { LoaderService, Question, questionEntity } from '@hrc/shared-feature';
import { Store } from '@ngrx/store';
import { addDoc, collection, collectionChanges, CollectionReference, deleteDoc, doc, Firestore, query, updateDoc } from '@angular/fire/firestore';


@Injectable()
export class QuestionEffects {

  constructor(private actions$: Actions,
    private store: Store<questionEntity.QuestionState>,
    private firestore: Firestore,
    private loader: LoaderService) {}

  load$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(QuestionActions.loadAllQuestions),
    mergeMap(() => {
      this.loader.isLoading.next(true);
      return this.get()
      .pipe(
        map(data => {
          this.loader.isLoading.next(false);
          const result = new Array<Question>();
          data.forEach(x => {
            return result.push({...x.doc.data(), id: x.doc.id});
          });
          return QuestionActions.loadAllQuestionsSuccess({payload: result});
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
      return this.create(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return QuestionActions.createQuestionSuccess({payload: {...x.payload, id: data.id}});
        })
        .catch((err: any) => {
            this.loader.isLoading.next(false);
            return QuestionActions.createQuestionFailire({error: err});
        });
    })
  )});

  update$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(QuestionActions.updateQuestion),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.update(x.payload)
        .then(data => {
          this.loader.isLoading.next(false);
          return QuestionActions.updateQuestionSuccess({payload: data});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return QuestionActions.updateQuestionFailure({error: err});
        });
    })
  )});

  delete$ = createEffect(() => {
    return this.actions$.pipe(
    ofType(QuestionActions.deleteQuestion),
    mergeMap(x => {
      this.loader.isLoading.next(true);
      return this.delete(x.payload.id ?? '')
        .then(() => {
          this.loader.isLoading.next(false);
          return QuestionActions.deleteQuestionSuccess({payload: x.payload.id});
        })
        .catch((err: any) => {
          this.loader.isLoading.next(false);
          return QuestionActions.deleteQuestionFailure({error: err});
        });
    })
  )});

  get() {
    return collectionChanges<Question>(query<Question>(collection(this.firestore, 'questions') as CollectionReference<Question>));
  }

  create(question: Question) {
    delete question.id;
    const g = Object.assign({}, question);
    return addDoc(collection(this.firestore, 'questions'), g);
  }

  update(question: Question) {
    const g = Object.assign({}, question);
    return updateDoc(doc(collection(this.firestore, 'questions') as CollectionReference<Question>, g.id), g);
  }

  delete(id: string) {
    return deleteDoc(doc(this.firestore, 'questions', id));
  }
}

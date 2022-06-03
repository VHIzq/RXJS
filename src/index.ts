import { Observable, Observer } from "rxjs"

const observer: Observer<any> = {
  next: (value) => console.log("next: ", value),
  error: (error) => console.warn("error: ", error),
  complete: () => console.info("completado"),
};


const intervalo$ = new Observable<number>(subscriber => {

  let count = 0;
  //*cuando nos suscribimos creamos una instancia del observable.
  const interval = setInterval(() => {
    count++
    subscriber.next(count)
    console.log(count)
  }, 1000)

  return () => {
    clearInterval(interval);
    console.log('fuga de memoria destruida: intervalo destruido');
  }
  
});

const subscription = intervalo$.subscribe(num => console.log('Segundo: ', num));
const subscription2 = intervalo$.subscribe(num => console.log('Segundo: ', num));
const subscription3 = intervalo$.subscribe(num => console.log('Segundo: ', num));

setTimeout(() => {
  subscription.unsubscribe();
  subscription2.unsubscribe();
  subscription3.unsubscribe();
  console.log('cancelado');
}, 5000);

# Algorithm

## schedule

```js
const schedule = {
    "0": [],
    "1": []
}
```
> Map - ключ: сутки от 0 до 23 часов,
значение: массив идентификаторов устройств, которые работают в этот час

1) находим приборы, которые работают 24 часа
2) добавляем их в массив, соответствующий каждому часу
3) смотрим поле mode, 
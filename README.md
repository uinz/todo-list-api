# API

## LIST

#### Reuqest

- Method: **GET**

- URL: `/`

#### Response

- Body

```json
[
  {
    "id": "asdasd-asdasd-asdasd-asdasd",
    "title": "eat",
    "status": "active",
    "createdAt": "1527681806503",
    "updatedAt": "1527681806503"
  },
  {
    "id": "asdasd-asdasd-asdasd-dssss",
    "title": "sleep",
    "status": "active",
    "createdAt": "1527681806503",
    "updatedAt": "1527681806503"
  }
]
```

---

## CREAT

#### Reuqest

- Method: **POST**

- URL: `/`

- Headers： `Content-Type: application/json`

- Body:

```json
{
  "title": "sleep",
  "status": "active",
}
```

#### Response

- Body

```json
{
  "id": "balabalabala...."
}
```

---

## DELETE

#### Reuqest

- Method: **DELETE**

- URL: `/:id`

#### Response

- Body

```json
{
  "message": "success"
}
```

---

## UPDATE

#### Reuqest

- Method: **PATCH**

- URL: `/:id`

- Headers： `Content-Type: application/json`

- Body:

```json
{
  "title": "walk",
  "status": "active",
}
```

#### Response

- Body

```json
{
  "message": "success"
}
```

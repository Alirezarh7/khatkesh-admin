export interface RoleType {
  "roles": {
    "isSuccess": boolean,
    "isFailure": boolean,
    "value": {
      "id": number,
      "title": number,
      "description": number,
      "permissions": {
        "id": number,
        "name": {
          "value": string
        },
        "active": boolean,
        "description": string,
        "roles": [
          null
        ]
      }[],
    }[],
  }
}
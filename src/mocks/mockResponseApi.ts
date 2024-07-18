import { RandomUserAPIResponse } from "@/domain/entities/Student/types/student.type";

export const mockResponseApi: RandomUserAPIResponse =
{
    results: [
        {
            gender: 'male',
            name: {
                title: 'Mr',
                first: 'John',
                last: 'Doe'
            },
            location: {
                street: {
                    number: 123,
                    name: 'Main St'
                },
                city: 'Anytown',
                state: 'Anystate',
                country: 'United States',
                postcode: '12345',
                coordinates: {
                    latitude: '0.0000',
                    longitude: '0.0000'
                },
                timezone: {
                    offset: '-3:00',
                    description: 'Brasilia'
                }
            },
            email: 'john.doe@example.com',
            login: {
                uuid: 'abc-123',
                username: 'johndoe',
                password: 'password',
                salt: 'salt',
                md5: 'md5',
                sha1: 'sha1',
                sha256: 'sha256'
            },
            dob: {
                date: '1990-01-01T00:00:00Z',
                age: 30
            },
            phone: '555-555-5555',
            picture: {
                large: 'https://randomuser.me/api/portraits/men/1.jpg',
                medium: 'https://randomuser.me/api/portraits/med/men/1.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
            },
            nat: 'US'
        }
    ],
    info: {
        seed: "",
        results: 0,
        page: 0,
        version: ""
    }
}
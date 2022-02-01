module.exports = function(){
    const fake = require("faker");
    const _ = require("lodash");

    return{
        users: _.times(5, function(n){
            return{
                id: n,
                firstName: fake.name.firstName(),
                lastName: fake.name.lastName(),
                gender: fake.name.gender(),
                profile:{
                    // avatar: "https://i.pravatar.cc/150",
                    avatar: fake.random.image(),
                    cover: fake.random.image(),
                    // cover: `https://picsum.photos/780/196`,
                    company: {
                        companyLogo: fake.random.image(),
                        companyName: fake.company.companyName(),
                        jobPosition: fake.name.jobTitle(),
                    },   
                    address:{
                        city: fake.address.city(),
                        country: fake.address.country(),
                    },
                    contact: fake.phone.phoneNumber(),
                    email: fake.internet.email(),
                    // title: fake.name.jobTitle()
                },

                experiences: _.times(7, function(i){
                    return {
                        id: i,
                        companyLogo: fake.random.image(),
                        companyName: fake.company.companyName(),
                        postName: fake.name.jobTitle(),
                        contratTitle: fake.name.title(),
                        durationFrom: fake.date.month() +' '+ (2021 - Math.floor(Math.random()* 5) + 5),
                        durationTo: fake.date.month() +' '+ (2021 - Math.floor(Math.random()* 5)),
                        address: {
                            city: fake.address.cityName(),
                            country: fake.address.country()
                        },
                        description: fake.lorem.paragraph(),
                        // current: (i === 6)? true : false
                    }
                }),
                
                educations: _.times(6, function(j){
                    return {
                        id:j,
                        schoolLogo: fake.random.image(),
                        schoolName: fake.company.companyName(),
                        major: fake.name.title(),
                        levelTitle: (Math.floor(Math.random()* 5) +1) + ' Grade',
                        durationFrom: fake.date.month() +' '+ (2021 - Math.floor(Math.random()* 5) + 5),
                        durationTo: fake.date.month() +' '+ (2021 - Math.floor(Math.random()* 5)),
                        address: {
                            city: fake.address.cityName(),
                            country: fake.address.country()
                        }
                    }
                }),

                friends: _.times(9, function(m){
                    return {
                        id: m,
                        firstName: fake.name.firstName(),
                        lastName: fake.name.lastName()
                    }
                })
            }
        })
    }
}
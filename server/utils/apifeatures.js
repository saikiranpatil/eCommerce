class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        
        const keyword = this.queryStr.keyword
        ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        }
        : {};

        this.query = this.query.find({ ...keyword });

        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;

    }

    filter() {
        const queryCopy = { ...this.queryStr };

        const removeFields = ["keyword", "page", "limit"];

        removeFields.forEach(e => {
            delete queryCopy[e]
        });

        let newQueryStr = JSON.stringify(queryCopy);

        newQueryStr = newQueryStr.replace(/gt|lt|gte|lte/gi, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(newQueryStr));

        return this;
    }
};

module.exports = ApiFeatures;
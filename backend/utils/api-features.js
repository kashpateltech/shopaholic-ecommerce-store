class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  pagination(resultsPerPage) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);

    return this;
  }

  filter() {
    const copyQuery = { ...this.queryString };

    const removedFields = ["keyword", "page", "limit"];

    removedFields.forEach((key) => delete copyQuery[key]);

    let queryString = JSON.stringify(copyQuery);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (key) => `$${key}`
    );

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
}

module.exports = ApiFeatures;

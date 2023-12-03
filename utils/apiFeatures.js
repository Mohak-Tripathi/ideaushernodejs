class APIFeatures {
    constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
      // console.log(this.queryStr)
    }
  
    //search logic
    search() {
        const keyword = this.queryStr.keyword
      ? {
          $or: [
            { title: { $regex: this.queryStr.keyword, $options: 'i' } },
            { description: { $regex: this.queryStr.keyword, $options: 'i' } },
          ],
        }
      : {};
  
      // console.log(keyword)
  
      this.query = this.query.find({ ...keyword });
      return this;
    }
  
    sort() {
        const sortBy = this.queryStr.sort === '1' ? 'createdAt' : '-createdAt';
        this.query = this.query.sort(sortBy);
        return this;
      }

        //filter logic
      filterByDate() {
        const { startDate, endDate } = this.queryStr;
    // console.log(startDate, endDate);
        if (startDate && endDate) {
          this.query = this.query.find({
            createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
          });
        } else if (startDate) {
            console.log(startDate, "joined")
          this.query = this.query.find({ createdAt: { $gte: new Date(startDate) } });
        } else if (endDate) {
          this.query = this.query.find({ createdAt: { $lte: new Date(endDate) } });
        }
    
        return this;
      }

  //pagination logic
    pagination(resPerPage) {
      const currentPage = Number(this.queryStr.page) || 1;
      const skip = resPerPage * (currentPage - 1);
  
      this.query = this.query.limit(resPerPage).skip(skip);
      return this; 
    }
  }
  
  module.exports = APIFeatures;
  
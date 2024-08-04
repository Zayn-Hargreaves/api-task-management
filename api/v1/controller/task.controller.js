const Task = require("../model/task.model")
const paginationHelper = require("../../../helper/paginationHelper")
const searchHelper = require("../../../helper/searchHelper")
module.exports.index = async (req, res) => {
    const find = {
        $or:[
            {createdBy:req.user.id},
            {listUser: req.user.id},
        ],
        deleted: false
    }
    const objectSearch = searchHelper(req.query)
    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }
    if (req.query.status) {
        find.status = req.query.status
    }
    const sort = {}
    if (req.params.sortKey) {
        sort[req.params.sortKey] = req.params.sortValue
    }
    let countTask = await Task.countDocuments(find)
    let objectPagination = paginationHelper(
        {
            currentPage: 1,
            limitItems: 2,
        },
        req.query,
        countTask
    )
    const task = await Task.find(find).sort(sort)
        .limit(objectPagination.limitItem)
        .skip(objectPagination.skip)
    res.json(task)

}
module.exports.detail = async (req, res) => {

    const task = await Task.findone({
        deleted: false,
        _id: req.params.id
    })
    res.json(task)
}
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id
        await Task.updateOne({
            _id: id,
        }, { status: req.body.status })
        res.json({
            code: 200,
            message: "Cập Nhật trạng thái thành công"
        })
    } catch (error) {
        res.json({
            code: 200,
            message: "Cập Nhật trạng thái không thành công"
        })
    }
}
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body
        switch (key) {
            case "status":
                await Task.updateMany({ _id: { $in: ids } }, { status: value })
                break;
            case "deleted":
                await Task.updateMany({ _id: { $in: ids } }, {deleted:true, deletedAt: new Date()})
                break;
            default:
                res.json({
                    code: 200,
                    message: "Không tồn tại"
                })
                break;
        }
        res.json({
            code: 200,
            message: "Cập Nhật trạng thái thành công"
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Cập Nhật trạng thái không thành công"
        })
    }
}
module.exports.create = async (req, res) => {
    try {
        req.body.createdBy = req.user.id
        const task = new Task(req.body)
        const data = await task.save()
        res.json({
            code: 200,
            message: "tạo thành công",
            data: data
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "tạo không thành công",
            data: data
        })
    }
}

module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id
        await Task.updateOne({ _id: id }, req.body)
        res.json({
            code: 200,
            message: "cập nhật thành công",
            data: data
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "cập nhật thất bại ",
            data: data
        })
    }
}

module.exports.delete = async (req, res) => {
    try {
        await Task.updateOne({ _id: req.params.id }, {deleted:true, deletedAt: new Date()})
        res.json({
            code: 200,
            message: "xóa thành công",
        })
    } catch (error) {
        res.json({
            code: 400,
            message: "Xóa thất bại",
            data: data
        })
    }
}

const Group = require("../schemas/group");

class GroupService {
    _id;

    constructor(id) {
        this._id = id;
    }

    static async getGroups() {
        return await Group.find().populate('members').exec()
    }

    async getGroup() {
        return await Group.findById(this._id).populate('members').exec()
    }

    static async createGroup(group) {
        return await new Group(group).save()
    }

    async updateGroup(properties) {
        return await Group.findByIdAndUpdate(this._id, properties, { new: true }).exec()
    }

    async deleteGroup() {
        return await Group.findByIdAndDelete(this._id).exec()
    }
}

module.exports = GroupService
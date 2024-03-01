import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const videoSchema = new Schema({
 video_id: String,
 data: Buffer,
 size: Number,
 content_type: String
});

const Video = mongoose.model('Video', videoSchema)

export default Video;
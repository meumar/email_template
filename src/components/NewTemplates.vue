<template>
  <section>
    <div>
      <el-row :gutter="900">
        <el-col :span="6">
          <div>
            <vue-draggable-resizable
              :draggable="true"
              v-for="(field, index) of fieldsData"
              :key="index"
              :w="field.width"
              :h="field.height"
              :x="field.x"
              :y="field.y"
              @resizing="
                      (x, y, width, height) =>
                        onResize(x, y, width, height)
                    "
              :parent="true"
            >
              <ParagraphBlock :data="field" v-if="field.type === 'PARA'"></ParagraphBlock>
              <ImageBlock :data="field" v-if="field.type === 'IMAGE'"></ImageBlock>
              <HeadingBlock :data="field" v-if="field.type === 'HEAD'"></HeadingBlock>
            </vue-draggable-resizable>
          </div>
        </el-col>
        <el-col :span="6" :offset="12">
          <span class="fields-title mt-1">Add</span>
          <div>
            <el-button @click="dialogParaFormVisible = true">Paragraph Bloack</el-button>
          </div>
          <div>
            <el-button @click="dialogHeadingFormVisible = true">Heading Bloack</el-button>
          </div>
          <div>
            <el-button @click="dialogImageFormVisible = true">Image Bloack</el-button>
          </div>
        </el-col>
      </el-row>
      <el-dialog :visible.sync="dialogParaFormVisible" title="Enter Paragraph">
        <el-form>
          <el-form-item>
            <el-input v-model="paragraphText"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addParaBlock(paragraphText) ">Submit</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog :visible.sync="dialogHeadingFormVisible" title="Enter Heading">
        <div>
          <el-row :gutter="20">
            <el-col :span="24">
              <div class="form-group">
                <el-input
                  type="text"
                  v-model="blockHeadingText"
                  placeholder="Enter content or block title"
                ></el-input>
              </div>
            </el-col>
            <el-col :span="4">
              <div class="form-group">
                <el-select v-model="blockHeadingType" placeholder="Select Heading Type">
                  <el-option v-for="item in options" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </div>
            </el-col>
          </el-row>
          <el-button
            type="primary"
            @click="addHeadBlock(blockHeadingText,blockHeadingType)"
            :disabled="!blockHeadingType"
          >Submit</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="dialogImageFormVisible" title="Upload an Image">
        <el-form label-position="right">
          <el-row type="flex" :gutter="30">
            <el-col :span="8">
              <el-upload
                class="upload-demo"
                action
                multiple
                :on-change="upload"
              >
                <el-button size="small" type="primary">Click to upload</el-button>
                <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
              </el-upload>
            </el-col>
            <el-col :span="4">
              <el-button class="capitalize" type="primary" @click="addImageBlock">
                <span>Upload</span>
              </el-button>
            </el-col>
          </el-row>
          <el-row type="flex" :gutter="30">
            <el-col v-if="this.file.image_url" :span="8">
              <img :src="this.file.image_url" alt="IMG" style="width: 200px;height:150px;" />
            </el-col>
            <el-col :span="12">
              <!-- <span>{{this.field.image_url}}</span> -->
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import VueDraggableResizable from "vue-draggable-resizable";
import ParagraphBlock from "./formElements/paragraphBlock.vue";
import ImageBlock from "./formElements/imageBlock.vue";
import HeadingBlock from "./formElements/headingBlock.vue";
export default {
  components: {
    VueDraggableResizable,
    ParagraphBlock,
    ImageBlock,
    HeadingBlock
  },

  created() {},
  async mounted() {},
  data() {
    return {
      uploadedFile: "",
      file: [],
      blockHeadingType: "",
      blockHeadingText: "",
      options: ["H1", "H2", "H3", "H4", "H5", "H6"],
      paragraphText: "",
      dialogImageFormVisible: false,
      dialogParaFormVisible: false,
      dialogHeadingFormVisible: false,
      fieldsData: [],
      y:0
    };
  },
  computed: {},
  methods: {
    upload(file) {
      this.file = URL.createObjectURL(file.raw);
    },
    addHeadBlock(text, type) {
      this.dialogHeadingFormVisible = false;
       if(this.fieldsData.length){
        this.y = this.y+100;
      }else{
        this.y = 100;
      }
      let data = {
        type: "HEAD",
        width: 150,
        height: 100,
        x: 100,
        y: this.y,
        headingText: text,
        headingType: type
      };
      this.fieldsData.push(data);
      this.blockHeadingType = "";
      this.blockHeadingText = "";
    },
    addImageBlock(){
      this.dialogImageFormVisible = false;
      if(this.fieldsData.length){
        this.y = this.y+100;
      }else{
        this.y = 100;
      }
      let data = {
        type: "IMAGE",
        width: 150,
        height: 100,
        x: 100,
        y: this.y,
        file:this.file,
      };
      this.fieldsData.push(data);
    },
    addParaBlock(text) {
      this.dialogParaFormVisible = false;
       if(this.fieldsData.length){
        this.y = this.y+100;
      }else{
        this.y = 100;
      }
      let data = {
        type: "PARA",
        width: 150,
        height: 100,
        x: 100,
        y: this.y,
        text: text  
      };
      this.fieldsData.push(data);
      this.paragraphText = "";
    },
    onResize(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    },
    onDrag(x, y) {
      this.x = x;
      this.y = y;
    }
  }
};
</script>
<style scoped>
</style>

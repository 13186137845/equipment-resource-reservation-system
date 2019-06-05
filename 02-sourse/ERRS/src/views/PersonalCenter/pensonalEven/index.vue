
<template>
  <d2-container>
    <div>
      <div class="block">
        <div style="float:left;width:70%;">
          <el-form label-width="130px">
            <el-form-item
              label="标题："
              :span="2"
              :label-width="formLabelWidth"
            >
              <el-input
                :label-width="formLabelWidth"
                v-model="taas.h4"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="时间："
              :span="2"
            >
              
              <el-date-picker
              v-model="taas.timestamp"
              type="datetime"
              format="yyyy/MM/dd HH:mm"
              placeholder="选择日期时间">
              </el-date-picker>
             
            </el-form-item>
          </el-form>
          <el-card style="height: 610px;width: 100%;">
            <quill-editor
              v-model="taas.text"
              ref="myQuillEditor"
              style="height: 500px;width: 100%; "
              :options="editorOption"
            >

              <!-- 自定义toolar -->
              <div
                id="toolbar"
                slot="toolbar"
              >
                <!-- Add a bold button -->
                <button
                  class="ql-bold"
                  title="加粗"
                >Bold</button>
                <button
                  class="ql-italic"
                  title="斜体"
                >Italic</button>
                <button
                  class="ql-underline"
                  title="下划线"
                >underline</button>
                <button
                  class="ql-strike"
                  title="删除线"
                >strike</button>
                <button
                  class="ql-blockquote"
                  title="引用"
                ></button>
                <button
                  class="ql-code-block"
                  title="代码"
                ></button>
                <button
                  class="ql-header"
                  value="1"
                  title="标题1"
                ></button>
                <button
                  class="ql-header"
                  value="2"
                  title="标题2"
                ></button>
                <!--Add list -->
                <button
                  class="ql-list"
                  value="ordered"
                  title="有序列表"
                ></button>
                <button
                  class="ql-list"
                  value="bullet"
                  title="无序列表"
                ></button>
                <!-- Add font size dropdown -->
                <select
                  class="ql-header"
                  title="段落格式"
                >
                  <option selected>段落</option>
                  <option value="1">标题1</option>
                  <option value="2">标题2</option>
                  <option value="3">标题3</option>
                  <option value="4">标题4</option>
                  <option value="5">标题5</option>
                  <option value="6">标题6</option>
                </select>
                <select
                  class="ql-size"
                  title="字体大小"
                >
                  <option value="10px">10px</option>
                  <option value="12px">12px</option>
                  <option value="14px">14px</option>
                  <option
                    value="16px"
                    selected
                  >16px</option>
                  <option value="18px">18px</option>
                  <option value="20px">20px</option>
                </select>
                <select
                  class="ql-font"
                  title="字体"
                >
                  <option value="SimSun">宋体</option>
                  <option value="SimHei">黑体</option>
                  <option value="Microsoft-YaHei">微软雅黑</option>
                  <option value="KaiTi">楷体</option>
                  <option value="FangSong">仿宋</option>
                  <option value="Arial">Arial</option>
                </select>
                <!-- Add subscript and superscript buttons -->
                <select
                  class="ql-color"
                  value="color"
                  title="字体颜色"
                ></select>
                <select
                  class="ql-background"
                  value="background"
                  title="背景颜色"
                ></select>
                <select
                  class="ql-align"
                  value="align"
                  title="对齐"
                ></select>
                <button
                  class="ql-clean"
                  title="还原"
                ></button>
                <!-- You can also add your own -->
              </div>
            </quill-editor>

          </el-card>
          <div style="margin:10px;">
            <el-button
              type="primary"
              @click="sub()"
            >提交</el-button>
          </div>
        </div>
        <div
          class="block"
          style="float:left; margin:30px;width:25%"
        >
          <el-timeline>
            <el-timeline-item
              :timestamp="item.timestamp"
              placement="top"
              v-for="item in tabs"
              :key="item.h4"
             
            >
              <el-card  @click.native="jump()">
                <h4>{{item.h4}}</h4>
                <p>{{item.p}}</p>
              </el-card>
            </el-timeline-item>

          </el-timeline>

        </div>
      </div>

    </div>
  </d2-container>
</template>


<script>
//导入添加用户模块
import { personnelService } from "@/common/api";
import { Quill, quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

//引入font.css
import "../pensonalEven/font.css";

// 自定义字体大小
let Size = Quill.import("attributors/style/size");
Size.whitelist = ["10px", "12px", "14px", "16px", "18px", "20px"];
Quill.register(Size, true);

// 自定义字体类型
var fonts = [
  "SimSun",
  "SimHei",
  "Microsoft-YaHei",
  "KaiTi",
  "FangSong",
  "Arial",
  "Times-New-Roman",
  "sans-serif",
  "宋体",
  "黑体"
];
var Font = Quill.import("formats/font");
Font.whitelist = fonts;
Quill.register(Font, true);

export default {
  name: "FuncFormsEdit",
  components: {
    quillEditor
  },
 
  data() {
    return {
      taas: {
        h4: "",
        p: "",
        timestamp: "",
           text:""
      },
   
      nowtime: "",
      tabs: [
        {
          timestamp: "2018/4/12 20:46",
          h4: "第三批设备购入",
          p: "huahua 提交于 2018/4/12 20:46"
        },
        {
          timestamp: "2018/4/3 20:46",
          h4: "设备保修",
          p: "huahua 提交于 2018/4/3 20:46"
        },
        {
          timestamp: "2018/4/2 20:46",
          h4: "设备地点",
          p: "huahua 提交于 2018/4/2 20:46"
        }
      ],
      content: null,
      formLabelWidth: "120px",
      editorOption: {
        placeholder: "请输入",
        theme: "snow", // or 'bubble'
        modules: {
          toolbar: {
            container: "#toolbar"
          }
        }
      }
    };
  },
  methods: {
    jump(){
      this.$alert(this.taas.text, '我的事件', {
          dangerouslyUseHTMLString: true
        });
    },
    sub() {
      this.nowtime = new Date().toLocaleString();
      this.tabs.push(this.taas);
      this.tabs[this.tabs.length-1].p = "huahua提交于" + this.nowtime;
    }
  }
};
</script>

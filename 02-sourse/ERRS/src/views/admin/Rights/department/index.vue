<template>
  <d2-container>
  <div>
    <div class="custom-tree-container">
      <div class="block">
        <p>XXX公司</p>
        <el-tree
          :data="data"
          show-checkbox
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button type="text" size="mini" @click="() => append(data)">添加部门</el-button>
              <el-button type="text" size="mini" @click="() => remove(node, data)">删除部门</el-button>
            </span>
          </span>
        </el-tree>
      </div>
    </div>
  </div>
  </d2-container>
</template>

<script>
let id = 1000;
export default {
  data() {
    const data = [
      {
        id: 1,
        label: "xxx联合有限公司",
        children: [
          {
            id: 4,
            label: "xxx联合有限公司董事会",
            children: [
              {
                id: 9,
                label: "xxx联合有限公司技术部"
              },
              {
                id: 10,
                label: "xxx联合有限公司财务部"
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: "zzz联合有限公司",
        children: [
          {
            id: 5,
            label: "zzz联合有限公司董事会"
          },
          {
            id: 6,
            label: "zzz联合有限公司董事长"
          }
        ]
      }
    ];
    return {
      data: JSON.parse(JSON.stringify(data)),
      data: JSON.parse(JSON.stringify(data))
    };
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    }
  }
};
</script>
<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>


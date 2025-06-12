<?php
/**
 * 年度计划管理插件
 * 
 * @package Plans
 * @author Yang
 * @version 1.0.0
 * @link https://github.com/hkyang233
 */
class Plans_Plugin implements Typecho_Plugin_Interface
{
    /**
     * 激活插件方法,如果激活失败,直接抛出异常
     * 
     * @access public
     * @return void
     * @throws Typecho_Plugin_Exception
     */
    public static function activate()
    {
        // 创建数据表
        $db = Typecho_Db::get();
        $prefix = $db->getPrefix();
        
        $db->query("CREATE TABLE IF NOT EXISTS `{$prefix}plans` (
            `id` int(11) NOT NULL AUTO_INCREMENT,
            `title` varchar(200) NOT NULL,
            `description` text,
            `category` varchar(50) NOT NULL,
            `status` varchar(20) NOT NULL DEFAULT 'not-started',
            `progress` int(3) NOT NULL DEFAULT 0,
            `start_date` date NOT NULL,
            `target_date` date NOT NULL,
            `created` int(10) NOT NULL,
            `modified` int(10) NOT NULL,
            PRIMARY KEY (`id`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");
    }
    
    /**
     * 禁用插件方法,如果禁用失败,直接抛出异常
     * 
     * @static
     * @access public
     * @return void
     * @throws Typecho_Plugin_Exception
     */
    public static function deactivate()
    {
        // 可以选择是否删除数据表
        // $db = Typecho_Db::get();
        // $prefix = $db->getPrefix();
        // $db->query("DROP TABLE IF EXISTS `{$prefix}plans`");
    }
    
    /**
     * 获取插件配置面板
     * 
     * @access public
     * @param Typecho_Widget_Helper_Form $form 配置面板
     * @return void
     */
    public static function config(Typecho_Widget_Helper_Form $form)
    {
        // 插件配置项
    }
    
    /**
     * 个人用户的配置面板
     * 
     * @access public
     * @param Typecho_Widget_Helper_Form $form
     * @return void
     */
    public static function personalConfig(Typecho_Widget_Helper_Form $form)
    {
        // 个人配置项
    }
    
    /**
     * 插件实现方法
     * 
     * @access public
     * @return void
     */
    public static function render()
    {
        // 插件实现
    }
}

// API 路由处理
$options = Helper::options();
$request = Typecho_Request::getInstance();
$response = Typecho_Response::getInstance();

// 设置响应头
$response->setContentType('application/json');

// 获取数据库实例
$db = Typecho_Db::get();
$prefix = $db->getPrefix();

// 处理不同的请求方法
switch ($request->getMethod()) {
    case 'GET':
        // 获取计划列表
        $query = $db->select()->from('table.plans')->order('created', Typecho_Db::SORT_DESC);
        $plans = $db->fetchAll($query);
        echo json_encode(['code' => 0, 'data' => $plans]);
        break;
        
    case 'POST':
        // 创建新计划
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) {
            echo json_encode(['code' => 1, 'msg' => '无效的数据']);
            break;
        }
        
        $data['created'] = time();
        $data['modified'] = time();
        
        $db->query($db->insert('table.plans')->rows($data));
        echo json_encode(['code' => 0, 'msg' => '创建成功']);
        break;
        
    case 'PUT':
        // 更新计划
        $id = $request->get('id');
        if (!$id) {
            echo json_encode(['code' => 1, 'msg' => '缺少ID参数']);
            break;
        }
        
        $data = json_decode(file_get_contents('php://input'), true);
        if (!$data) {
            echo json_encode(['code' => 1, 'msg' => '无效的数据']);
            break;
        }
        
        $data['modified'] = time();
        
        $db->query($db->update('table.plans')->rows($data)->where('id = ?', $id));
        echo json_encode(['code' => 0, 'msg' => '更新成功']);
        break;
        
    case 'DELETE':
        // 删除计划
        $id = $request->get('id');
        if (!$id) {
            echo json_encode(['code' => 1, 'msg' => '缺少ID参数']);
            break;
        }
        
        $db->query($db->delete('table.plans')->where('id = ?', $id));
        echo json_encode(['code' => 0, 'msg' => '删除成功']);
        break;
        
    default:
        echo json_encode(['code' => 1, 'msg' => '不支持的请求方法']);
        break;
} 
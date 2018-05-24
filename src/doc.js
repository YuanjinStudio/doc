
/**
 * @apiDefine CheckError
 * @apiError 400 Valid Error
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request: Valid Error
 *     {
 *       "code": 400,
 *       "isSuccess": false,
 *       "msg": "Product name must be an string"
 *     }
 */


/**
 * @apiDefine IDNotFound
 * @apiError 404 ID Not Found
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Bad Request: ID Not Found
 *     {
 *       "code": 404,
 *       "isSuccess": false,
 *       "msg": "Product ID not exists"
 *     }
 * 
 */

/**
 * @api {get} / 简介
 * @apiVersion 0.0.1
 * @apiName Introduction
 * @apiGroup Introduction
 * @apiDescription 简介</br>
 * <li>1.<a href="#api-Product-CreateProduct">【创建Product】</a>   最初创建的Product会处于panding,如果有callback将在成功创建之后调用callback的GET方法,并附带参数<code>?productId=87eac8d&productName=Sakura</code></li>
 * <li>2.<a href="#api-Product-GetProduct">【查询Product】</a>  返回Product的可用区以及响应的可用负载值</li>
 * <li>3.<a href="#api-Product-CreateProductRegionChunk">【增加Product可用数】</a>  新增Product所对应region的chunk数量</li>
 * <li>4.<a href="#api-Product-GetProductNodeConfigs">【获取Product可用资源内的配置列表】</a>  将按在各自region中可用性排序，最优的在最前</li>
 * <li>5.<a href="#api-Feedback-Feedback">【用户连接质量反馈】</a> </li>
 * 
 * 
 * </br></br>
 * <li><a href="#api-Product-GetProductList">【获取产品列表】</a></li>
 * <li><a href="#api-Product-PutProduct">【修改Product名称】</a></li>
 * <li><a href="#api-Product-DeleteProduct">【删除Product】</a></li>
 * <li>【机器维护】需要合作方提供一个关于维护/停用的接口，预计会传入批量的NodeConfigID 告知维护机器</li>
 * 
 * </br></br>
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * </br></br>
 * @apiExample {json} Product Construct:
 * {
 *      "_id":  "87eac8d",    // Product ID
 *      "name": "Sakura",     // Product Name
 *      "status": 0,          // 0.Success, 1.Panding, 2.Failed, 3.Maintain, 4.Disabled, 5.Deleted
 *      "regions": []         // Product Region List
 * }
 * 
 * @apiExample {json} Region Construct:
 * {
 *      "_id": "6752c8d",       // Region ID
 *      "region": "lax",        // Region Name
 *      "availableChunk": 16,   // Region AvailableChunk
 *      "hosts": []             // Host List
 * }
 * 
 * 
 * @apiExample {json} Host Construct:
 * {
 *      "_id": "a895c2e1",          // Host ID
 *      "host": "laxzl01.bar.com",  // Host Domain
 *      "nodeConfigs": []           // NodeConfig List
 * }
 * 
 * @apiExample {json} NodeConfig Construct:
 * {
 *      "_id": "72351a",
 *      "proxyType": "ssr",
 *      "port": 10000,
 *      "passwd": "oin2kh7m",
 *      "method": "chacha20",
 *      "obfs": "plain",
 *      "protocol": "origin",
 *      "obfs_param": "",
 *      "protocol_param": "",
 *      "enable": true
 * }
 * 
 * 
 */


/**
 * 
 * @api {post} /product 创建Product
 * @apiVersion 0.0.1
 * @apiName CreateProduct
 * @apiGroup Product
 *
 * @apiParam {String} name 产品名称
 * @apiParam {String} [callback] 可选，回调url，创建Product后将处于Panding状态.如果有设置callback,将在Product创建完成后回调该接口,参数为产品ID和产品名称?productId=87eac8d&productName=Sakura
 *
 * @apiSuccess {Number} code Http状态码
 * @apiSuccess {Boolean} isSuccess 响应状态
 * @apiSuccess {String} msg 响应信息
 * @apiSuccess {Product} product 产品状态
 * @apiSuccess {String} product._id 产品ID
 * @apiSuccess {String} product.name 产品名称
 * @apiSuccess {Number} product.status 产品创建状态, 0.Success, 1.Panding, 2.Failed, 3.Maintain, 4.Disabled, 5.Deleted
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 OK
 *     {
 *          "code": 201,
 *          "isSuccess": true,
 *          "msg": "Create Product Successfully",
 *          "product": {
 *              "_id": "87eac8d",
 *              "name": "Sakura",
 *              "status": 1
 *          }
 *      }
 * 
 * @apiUse CheckError
 * 
 */




/**
 * 
 * @api {put} /product/:id 修改Product名称
 * @apiVersion 0.0.1
 * @apiName PutProduct
 * @apiGroup Product
 *
 * @apiParam {String} id 产品ID
 * @apiParam {String} name 产品名称
 * 
 * @apiSuccess {Number} code Http状态码
 * @apiSuccess {Boolean} isSuccess 响应状态
 * @apiSuccess {String} msg 响应信息
 * @apiSuccess {Product} product 产品状态
 * @apiSuccess {String} product._id 产品ID
 * @apiSuccess {String} product.name 产品名称
 * @apiSuccess {Number} product.status 产品创建状态, 0.Success, 1.Panding, 2.Failed, 3.Maintain, 4.Disabled, 5.Deleted
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "code": 200,
 *          "isSuccess": true,
 *          "msg": "Modify Product Successfully",
 *          "product": {
 *              "_id": "87eac8d",
 *              "name": "Sakura",
 *              "status": 5
 *          }
 *      }
 * 
 * @apiUse IDNotFound
 * @apiUse CheckError
 * 
 */



/**
 * 
 * @api {delete} /product/:id 删除Product
 * @apiVersion 0.0.1
 * @apiName DeleteProduct
 * @apiGroup Product
 *
 * @apiParam {String} id 产品ID
 * 
 * @apiSuccess {Number} code Http状态码
 * @apiSuccess {Boolean} isSuccess 响应状态
 * @apiSuccess {String} msg 响应信息
 * @apiSuccess {Product} product 产品状态
 * @apiSuccess {String} product._id 产品ID
 * @apiSuccess {String} product.name 产品名称
 * @apiSuccess {Number} product.status 产品创建状态, 0.Success, 1.Panding, 2.Failed, 3.Maintain, 4.Disabled, 5.Deleted
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "code": 200,
 *          "isSuccess": true,
 *          "msg": "Delete Product Successfully",
 *          "product": {
 *              "_id": "87eac8d",
 *              "name": "Sakura",
 *              "status": 5
 *          }
 *      }
 * 
 * @apiUse IDNotFound
 */



/**
 * @api {get} /product/:id 查询Product
 * @apiVersion 0.0.1
 * @apiName GetProduct
 * @apiGroup Product
 *
 * @apiParam {String} id 产品ID
 * 
 * @apiSuccess {Number} code Http状态码
 * @apiSuccess {Boolean} isSuccess 响应状态
 * @apiSuccess {String} msg 响应信息
 * @apiSuccess {Product} product 产品状态
 * @apiSuccess {String} product._id 产品ID
 * @apiSuccess {String} product.name 产品名称
 * @apiSuccess {Number} product.status 产品创建状态, 0.Success, 1.Panding, 2.Failed, 3.Maintain, 4.Disabled, 5.Deleted
 * @apiSuccess {Regions[]} product.regions 产品可用区列表
 * @apiSuccess {String} product.regions.region 产品可用区
 * @apiSuccess {Number} product.regions.availableChunk 可用区对应的目前可用负载值
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "code": 200,
 *          "isSuccess": true,
 *          "msg": "Create Product Successfully"，
 *          "product": {
 *              "_id": "87eac8d",
 *              "name": "Sakura",
 *              "status": 0,
 *              "regions": [
 *                  {
 *                      "region": "lax",
 *                      "availableChunk": 16
 *                  },
 *                  {
 *                     "region": "hkg",
 *                     "availableChunk": 32
 *                  }
 *              ]
 *          }
 *      }
 * 
 * @apiUse IDNotFound
 * @apiUse CheckError
 * 
 */



/**
 * @api {post} /flock/product/region/chunks 增加Product可用数
 * @apiVersion 0.0.1
 * @apiName CreateProductRegionChunk
 * @apiGroup Product
 *
 * @apiParam {String} id 产品ID
 * @apiParam {Regions[]} regions 产品可用区列表
 * @apiParam {String} regions.region 产品可用区
 * @apiParam {Number} regions.increase 需要增加的可用区负载值
 * 
 * @apiSuccess {Number} code Http状态码
 * @apiSuccess {Boolean} isSuccess 响应状态
 * @apiSuccess {String} msg 响应信息
 * @apiSuccess {Product} product 产品状态
 * @apiSuccess {String} product._id 产品ID
 * @apiSuccess {String} product.name 产品名称
 * @apiSuccess {Number} product.status 产品创建状态, 0.Success, 1.Panding, 2.Failed, 3.Maintain, 4.Disabled, 5.Deleted
 * @apiSuccess {Regions[]} product.regions 产品可用区列表
 * @apiSuccess {String} product.regions.region 产品可用区
 * @apiSuccess {Number} product.regions.availableChunk 可用区对应的目前可用负载值
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "code": 200,
 *          "isSuccess": true,
 *          "msg": "Create product region chunks"，
 *          "product": {
 *              "_id": "87eac8d",
 *              "name": "Sakura",
 *              "status": 0,
 *              "regions": [
 *                  {
 *                      "region": "lax",
 *                      "availableChunk": 16
 *                  },
 *                  {
 *                     "region": "hkg",
 *                     "availableChunk": 32
 *                  }
 *              ]
 *          }
 *      }
 * 
 * @apiUse IDNotFound
 * @apiUse CheckError
 * 
 */



/**
 * @api {get} /product/nodeconfigs 获取Product可用资源内的配置列表
 * @apiVersion 0.0.1
 * @apiName GetProductNodeConfigs
 * @apiGroup Product
 *
 * @apiParam {String} id 产品ID
 * @apiParam {String[]} [regions] 可选参数，默认所有产品可用区
 * @apiParam {Boolean} [extendNodeConfigs=false] 可选，默认为false，为true时将展开product.regions[].hosts[].nodeConfigs属性
 * 
 * @apiSuccess {Number} code Http状态码
 * @apiSuccess {Boolean} isSuccess 响应状态
 * @apiSuccess {String} msg 响应信息
 * @apiSuccess {Product} product 产品状态
 * @apiSuccess {String} product._id 产品ID
 * @apiSuccess {String} product.name 产品名称
 * @apiSuccess {Number} product.status 产品创建状态, 0.Success, 1.Panding, 2.Failed, 3.Maintain, 4.Disabled, 5.Deleted
 * @apiSuccess {Regions[]} product.regions 产品可用区列表
 * @apiSuccess {String} product.regions.region 产品可用区
 * @apiSuccess {Number} product.regions.availableChunk 可用区对应的目前可用负载值
 * @apiSuccess {Hosts[]} product.regions.hosts 可用区Hosts
 * @apiSuccess {String} product.regions.hosts.host 可用区的host域名
 * @apiSuccess {String} product.regions.hosts._id 可用区的hostID
 * @apiSuccess {nodeConfigs[]} product.regions.hosts.nodeConfigs 可用区host的配置, 将按在各自region中可用性排序，最优的在最前
 * @apiSuccess {Number={10000-65535}} product.regions.hosts.nodeConfigs.port 可用区host的端口号
 * @apiSuccess {String} product.regions.hosts.nodeConfigs.passwd 可用区host的密码
 * @apiSuccess {String} product.regions.hosts.nodeConfigs.method 可用区host的加密方式
 * @apiSuccess {String} product.regions.hosts.nodeConfigs.protocol 协议
 * @apiSuccess {String} product.regions.hosts.nodeConfigs.obfs 混淆
 * @apiSuccess {String} product.regions.hosts.nodeConfigs.protocol_param 协议参数
 * @apiSuccess {String} product.regions.hosts.nodeConfigs.obfs_param 混淆参数
 * @apiSuccess {String} product.regions.hosts.nodeConfigs.enable 可用状态
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "code": 200,
 *          "isSuccess": true,
 *          "msg": "Get host success"，
 *          "product": {
 *              "_id": "87eac8d",
 *              "name": "Sakura",
 *              "status": 0,
 *              "regions": [
 *                  {
 *                      "region": "lax",
 *                      "availableChunk": 16,
 *                      "hosts": [
 *                          {
 *                              "_id": "a895c2e1"
 *                              "host": "laxzl01.bar.com"
 *                          }
 *                      ]
 *                  },
 *                  {
 *                     "region": "hkg",
 *                     "availableChunk": 32,
 *                     "hosts": [
 *                          {
 *                              "_id": "e8c582d2"
 *                              "host": "hkgwr01.bar.com"
 *                          },
 *                          {
 *                              "_id": "aa75cae1"
 *                              "host": "hkgzl02.bar.com"
 *                          }
 *                      ]
 *                  }
 *              ]
 *          }
 *      }
 * 
 * 
 * 
 * @apiSuccessExample Success-Response With extendNodeConfigs=true:
 *     HTTP/1.1 200 OK
 *     {
 *          "code": 200,
 *          "isSuccess": true,
 *          "msg": "Get node configs success"，
 *          "product": {
 *              "_id": "87eac8d",
 *              "name": "Sakura",
 *              "status": 0,
 *              "regions": [
 *                  {
 *                      "region": "lax",
 *                      "availableChunk": 16,
 *                      "hosts": [
 *                          {
 *                              "_id": "a895c2e1"
 *                              "host": "laxzl01.bar.com",
 *                              "nodeConfigs": [
 *                                  {
 *                                      "port": 10000,
 *                                      "passwd": "oin2kh7m",
 *                                      "method": "chacha20",
 *                                      "obfs": "plain",
 *                                      "protocol": "origin",
 *                                      "obfs_param": "",
 *                                      "protocol_param": "",
 *                                      "enable": true
 *                                  }
 *                               ]
 *                          }
 *                      ]
 *                  }
 *              ]
 *          }
 *      }
 * 
 * @apiUse IDNotFound
 * @apiUse CheckError
 * 
 */



/**
 * 
 * @api {get} /product 获取Product列表
 * @apiVersion 0.0.1
 * @apiName GetProductList
 * @apiGroup Product
 *
 * 
 * @apiSuccess {Number} code Http状态码
 * @apiSuccess {Boolean} isSuccess 响应状态
 * @apiSuccess {String} msg 响应信息
 * @apiSuccess {Product[]} products 产品列表
 * @apiSuccess {String} product._id 产品ID
 * @apiSuccess {String} product.name 产品名称
 * @apiSuccess {Number} product.status 产品创建状态, 0.Success, 1.Panding, 2.Failed, 3.Maintain, 4.Disabled, 5.Deleted
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "code": 200,
 *          "isSuccess": true,
 *          "msg": "Get products list success"，
 *          "products": [
 *              {
 *                  "_id": "87eac8d",
 *                  "name": "Sakura",
 *                  "status": 0
 *              }
 *          ]
 *      }
 * 
 * 
 */


/**
 * 
 * @api {post} /user/feedback 用户连接质量反馈
 * @apiVersion 0.0.1
 * @apiName Feedback
 * @apiGroup Feedback
 *
 * @apiParam {String} productID 产品ID
 * @apiParam {String} hostID 使用的线路的hostID
 * @apiParam {IP} ip 用户IP
 * @apiParam {Number} quality 延迟
 * @apiParam {String} [region] 用户所在地
 * @apiParam {String} [isp] 用户ISP
 * 
 * 
 * 
 * @apiSuccess {Number} code Http状态码
 * @apiSuccess {Boolean} isSuccess 响应状态
 * @apiSuccess {String} msg 响应信息
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *          "code": 200,
 *          "isSuccess": true,
 *          "msg": "Feedback user quality success"
 *     }
 * 
 */


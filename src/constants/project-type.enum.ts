/**
 * ProjectType
 *
 * Các loại khác nhau của một dự án.
 */
export enum ProjectType {
  /**
   * Dự án phát triển phần mềm.
   */
  SOFTWARE_TYPE = 'Software',

  /**
   * Dự án nghiên cứu và phát triển.
   */
  RESEARCH_TYPE = 'Research',

  /**
   * Dự án bảo trì và hỗ trợ.
   */
  MAINTENANCE_TYPE = 'Maintenance',

  /**
   * Dự án huấn luyện và đào tạo.
   */
  TRAINING_TYPE = 'Training',

  /**
   * Dự án marketing và quảng cáo.
   */
  MARKETING_TYPE = 'Marketing',

  /**
   * Dự án xây dựng cơ sở hạ tầng.
   */
  INFRASTRUCTURE_TYPE = 'Infrastructure',
}

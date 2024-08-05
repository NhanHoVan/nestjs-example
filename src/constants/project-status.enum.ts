/**
 * ProjectStatus
 *
 * Các trạng thái khác nhau của một dự án.
 */
export enum ProjectStatus {
  /**
   * Trạng thái khi dự án đang chờ xử lý.
   */
  PENDING_STATUS = 'Pending',

  /**
   * Trạng thái khi dự án đang được tiến hành.
   */
  IN_PROGRESS_STATUS = 'In Progress',

  /**
   * Trạng thái khi dự án đã hoàn thành.
   */
  COMPLETED_STATUS = 'Completed',

  /**
   * Trạng thái khi dự án đang bị tạm dừng.
   */
  ON_HOLD_STATUS = 'On Hold',

  /**
   * Trạng thái khi dự án đã bị hủy bỏ.
   */
  CANCELLED_STATUS = 'Cancelled',

  /**
   * Trạng thái khi dự án đang trong giai đoạn lập kế hoạch.
   */
  PLANNING_STATUS = 'Planning',

  /**
   * Trạng thái khi dự án đang được xem xét hoặc đánh giá.
   */
  REVIEW_STATUS = 'Review',

  /**
   * Trạng thái khi dự án đã được phê duyệt.
   */
  APPROVED_STATUS = 'Approved',

  /**
   * Trạng thái khi dự án đã bị từ chối.
   */
  REJECTED_STATUS = 'Rejected',

  /**
   * Trạng thái khi dự án bắt đầu.
   */
  START_STATUS = 'Start',
}

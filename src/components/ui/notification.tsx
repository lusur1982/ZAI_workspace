"use client"

import * as React from "react"
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNotificationStore, Notification } from "@/lib/notifications"

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
}

const iconColors = {
  success: "text-green-500",
  error: "text-red-500", 
  warning: "text-yellow-500",
  info: "text-blue-500",
}

const bgColors = {
  success: "bg-green-50 border-green-200",
  error: "bg-red-50 border-red-200",
  warning: "bg-yellow-50 border-yellow-200", 
  info: "bg-blue-50 border-blue-200",
}

function NotificationItem({ notification, onRemove }: { 
  notification: Notification
  onRemove: (id: string) => void 
}) {
  const Icon = icons[notification.type]
  
  return (
    <div
      className={cn(
        "relative p-4 rounded-lg border shadow-sm transition-all duration-300 ease-in-out",
        bgColors[notification.type]
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", iconColors[notification.type])} />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900">
            {notification.title}
          </h4>
          <p className="text-sm text-gray-600 mt-1">
            {notification.message}
          </p>
        </div>
        <button
          onClick={() => onRemove(notification.id)}
          className="flex-shrink-0 p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  )
}

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotificationStore()

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={removeNotification}
        />
      ))}
    </div>
  )
}

export { NotificationItem }
'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { cn } from '@/lib/utils'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()
  const { recipe } = getFactoryState()
  const isProfile = recipe.primaryTask === 'profile'
  const menuClass = isProfile
    ? 'w-56 border-slate-200 bg-white/98 shadow-lg'
    : 'w-56 border-[rgba(110,26,55,0.12)] bg-[rgba(255,250,244,0.98)]'
  const ghostBtn = isProfile
    ? 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    : 'text-[#5f4750] hover:bg-[rgba(110,26,55,0.06)] hover:text-[#8f1f3f]'
  const accentBorder = isProfile ? 'border-slate-200' : 'border-[rgba(110,26,55,0.12)]'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className={cn('rounded-full', ghostBtn)}>
          <Avatar className={cn('h-9 w-9 border', accentBorder)}>
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className={menuClass}>
        <div className="flex items-center gap-3 p-3">
          <Avatar className={cn('h-10 w-10 border', accentBorder)}>
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user?.name}</span>
            <span className="text-xs text-slate-500">{user?.email}</span>
          </div>
        </div>
        <DropdownMenuItem onClick={logout} className="text-destructive">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
